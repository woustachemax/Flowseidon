import { Polar } from "@polar-sh/sdk";

const testToken = async () => {
    console.log('Testing Polar token...');
    
    const polar = new Polar({
        accessToken: "polar_oat_u0R3wayV2UTZD3CeRhbMhnRcYYocovNJdvFkl1JoQSL",
        server: "sandbox"
    });

    try {
        // Test 1: List products (read operation)
        console.log('\n1. Testing products.list()...');
        const products = await polar.products.list({});
        console.log('✅ Products fetched successfully:', products.items?.length || 0, 'products');

        // Test 2: List customers (read operation)
        console.log('\n2. Testing customers.list()...');
        const customers = await polar.customers.list({});
        console.log('✅ Customers fetched successfully:', customers.items?.length || 0, 'customers');

        // Test 3: Try to create a customer (write operation)
        console.log('\n3. Testing customers.create()...');
        const newCustomer = await polar.customers.create({
            email: `test-${Date.now()}@example.com`,
        });
        console.log('✅ Customer created successfully:', newCustomer.id);

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        console.error('Status:', error.statusCode);
        console.error('Body:', error.body);
        console.error('Full error:', JSON.stringify(error, null, 2));
    }
};

testToken();
