export const ascending = (val1, val2) => val1 - val2
export const descending = (val1, val2) => val2 - val1

// Helper for protecting thunks and throwing errors accordingly.
export function continueOnStatusCodes(...statusCodes) {
  return res => {
    const message = [
      `
HTTP RESPONSE ERROR: Expected response status to be one of:${statusCodes} - got:${
        res.status
      }`,
      `HTTP RESPONSE ERROR: ...on ${res.config.method.toUpperCase()} to ${
        res.config.url
      }`
    ].join('\n')

    if (statusCodes.includes(res.status)) return res
    else throw TypeError(message)
  }
}
