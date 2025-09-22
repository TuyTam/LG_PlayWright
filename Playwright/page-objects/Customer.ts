export class Customer {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
    company?: string;

    constructor(firstName: string, lastName: string, email: string, address: string, city: string, state: string, zipCode: string, country: string, phone: string, company?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.country = country;
        this.phone = phone;
        this.company = company;


    }

    printInfo() {
        console.log(`Customer Info: 
        Name: ${this.firstName} ${this.lastName}
        Email: ${this.email}
        Address: ${this.address}, ${this.city}, ${this.state}, ${this.zipCode}, ${this.country}
        Phone: ${this.phone}
        Company: ${this.company ? this.company : 'N/A'}`);
    }
}
