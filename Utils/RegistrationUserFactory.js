function generateUniqueEmail(){
    return `test_${Date.now()}_${Math.floor(Math.random() * 1000)}@gmail.com`;
}

function createUser(overrides = {}){
    return{

        name: 'Akshay',
        email: generateUniqueEmail(),
        gender: 'Mrs',
        password: 'Test@123',
        day: '10',
        month: '5',
        year: '1998',
        firstName: 'Akshay',
        lastName: 'Kumar',
        company: 'ABC Pvt Ltd',
        address: 'Street 1',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        zipcode: '500001',
        mobile: '9876543210',
        ...overrides

    };
}

module.exports = {createUser}