module.exports = {
  DBErrMsg: req =>
    `CART ERROR [${
      req.sessionID
    }]: Created new cart in an PUT or DELETE request.
CART ERROR [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`,

  putSessionErrMsg: req => `CART WARNING [${
    req.sessionID
  }]: Didn't have a cart cookie in a PUT request.
CART WARNING [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`,

  postMsg: sessionId => `CARTS [${sessionId}]: Created new cart.`,

  postErrMsg: sessionId =>
    `CART ERROR[${sessionId}]: POSTED item that is already in cart.`,

  updateErrMsg: req =>
    `CART ERROR [${
      req.sessionID
    }] was able to update multiple line items in cart.
CART ERROR [${req.sessionID}]: Request follows: ${req.body}
====CART ERROR END REQUEST REPORT====`,

  delErrMsg: sessionId =>
    `CART ERROR [${sessionId}]: Tried to delete cart but no cart cookie set.`,

  delResultErrMsg: (id, num) =>
    `CART ERROR[${id}]: DELETE-d ${num} (>1) items from cart.`
}
