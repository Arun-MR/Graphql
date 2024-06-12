const {  gql } = require('apollo-server');

const products = require('../Datas/data');
const { default: axios } = require('axios');


// Define your GraphQL schema
const typeDefs = gql`

     type Todo {
            id: ID!
            title: String!
            completed: Boolean
            user:User
        }
             type User {
            id: ID!
            name: String!
            email: String!
        }
        
        type Query {
            getTodos: [Todo]
            getUsers:[User]
            getUser(id:ID!):User
        }


    type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        category: String!
    }

    input ProductInput {
        name: String!
        description: String
        price: Float!
        category: String!
    }

    type Mutation {
        addProduct(input: ProductInput!): Product!
        updateProduct(id: ID!, input: ProductInput!): Product!
        deleteProduct(id: ID!): Product
    }
`;

// Define resolver functions for mutations
const resolvers = {
    Todo:{
        user : async(todo)=>  (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
    },
    Query: {
        getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
        getUsers: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
        getUser: async (parent, {id})=> (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
    },
    Mutation: {
        addProduct: (parent, { input }) => {
            const newProduct = { id: String(products.length + 1), ...input };
            products.push(newProduct);
            return newProduct;
        },
        updateProduct: (parent, { id, input }) => {
          
            const index = products.findIndex(product => product.id == id);
            if (index !== -1) {
                products[index] = { ...products[index], ...input };
                console.log(products[index],"<<<<<<<,,")
                return products[index];
            }
            return null;
        },
        deleteProduct: (parent, { id }) => {
            console.log("first")
            const index = products.findIndex(product => product.id == id);
            if (index !== -1) {
                const deletedProduct = products.splice(index, 1);
                return deletedProduct[0];
            }
            return null;
        }
    }
};

module.exports = {
    resolvers,
    typeDefs
};
