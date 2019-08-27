/**
 * Add your actions here.
 * @module actions
 * @example
 * import {
 *   searchContent,
 * } from './search/search';
 *
 * export {
 *   searchContent,
 * };
 */

import { 
  GET_FRONTPAGESLIDES,
  SET_FOLDER_HEADER, 
  GET_DEFAULT_HEADER_IMAGE
} from '~/constants/ActionTypes';

export function getFrontpageSlides() {
    return {
      type: GET_FRONTPAGESLIDES,
      request: {
        op: 'get',
        path: `/frontpage_slides?fullobjects`,
      },
    };
}

export function getDefaultHeaderImage() {
  return {
    type: GET_DEFAULT_HEADER_IMAGE,
    request: {
      op: 'get',
      path: `/default_header_image?fullobjects`,
    },
  };
}



export function setFolderHeader(payload) {
  const actualPayload = {}
  for(const key in payload) {
    if(payload[key] !== null && payload[key] !== undefined) {
      actualPayload[key] = payload[key]
    }
  }
  if(Object.keys(actualPayload)) {
    return {
      type: SET_FOLDER_HEADER,
      payload: actualPayload
    };
  }
  return
}

