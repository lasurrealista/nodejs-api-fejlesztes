const personService = jest.mock('./person.service');

let mockData;

personService.findOne = jest.fn( id => Promise.resolve(
    mockData.find( p => p.id === id) ) 
);

personService.__setMockData = data => mockData = data;

module.exports = personService;
