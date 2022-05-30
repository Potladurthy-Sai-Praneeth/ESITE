// import "whatwg-fetch";

// const xhrMockClass = () => ({
//     open: jest.fn(),
//     send: jest.fn(),
//     setRequestHeader: jest.fn()
// })

// global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
//     // global.XMLHttpRequest = jest.fn(() => {});

global.fetch = require('jest-fetch-mock');
fetch.mockResponse(JSON.stringify({ testing: true }));