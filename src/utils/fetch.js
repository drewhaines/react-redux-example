import originalFetch from 'isomorphic-fetch';
import * as C from './constants';
import extend from 'extend';
import {
  getApiUrl,
  retrieveData,
  persistData,
  getTokenFormat,
  getSessionEndpointKey
} from './session-storage';
import {parseResponse} from './handle-fetch-response';


let isApiRequest = function(url) {
  return (url.match(getApiUrl(getSessionEndpointKey())));
};

/**
 * Add access token as a bearer token in accordance to RFC 6750
 *
 * @param {string} accessToken
 * @param {object} headers
 * @return {object} New extended headers object, with Authorization property
 */
export function addAuthorizationHeader(accessToken, headers) {
  return Object.assign({}, headers, {
    Authorization: `Bearer ${accessToken}`
  });
}

function getAuthHeaders(url) {
  if (isApiRequest(url)) {
    // fetch current auth headers from storage
    let currentHeaders = retrieveData(C.SAVED_CREDS_KEY) || {};
    let nextHeaders = {};

    // bust IE cache
    nextHeaders['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';

    // set header for each key in `tokenFormat` config
    for (let key in getTokenFormat()) {
      nextHeaders[key] = currentHeaders[key];
    }

    return addAuthorizationHeader(currentHeaders['access-token'], nextHeaders);
  } else {
    return {};
  }
}

function updateAuthFromBody(body) {
  // check config apiUrl matches the current response url
  const token = body.access_token;
  const tokenType = body.token_type;
  const expiry = body.expires_in;
  const tokenId = body.id_token;
  let authHeaders = {
    'access-token': token,
    'token-type': tokenType,
    'expiry': expiry,
    'idToken': tokenId,
  };
  persistData(C.SAVED_CREDS_KEY, authHeaders);
  return body;
}

function updateAuthCredentials(resp) {
  // check config apiUrl matches the current response url
  if (isApiRequest(resp.url)) {
    // set header for each key in `tokenFormat` config
    let newHeaders = {};

    // set flag to ensure that we don't accidentally nuke the headers
    // if the response tokens aren't sent back from the API
    let blankHeaders = true;

    // set header key + val for each key in `tokenFormat` config
    for (let key in getTokenFormat()) {
      newHeaders[key] = resp.headers.get(key);

      if (newHeaders[key]) {
        blankHeaders = false;
      }
    }

    // persist headers for next request
    if (!blankHeaders) {
      persistData(C.SAVED_CREDS_KEY, newHeaders);
    }
  }

  return resp;
}

export function fetchWithoutAuthHeaders(url, options={}) {
  if (!options.headers) {
    options.headers = {};
  }
  return originalFetch(url, options)
    .then(parseResponse)
    .then((body) => updateAuthFromBody(body));
}

export default function(url, options={}) {
  if (!options.headers) {
    options.headers = {};
  }

  extend(options.headers, {});
  return originalFetch(url, options)
    .then((resp) => {return resp});
}
