const refer = (schemaName: string) => '#/components/schemas/' + schemaName;

const swaggerOptions = {
  openapi: '3.0.2',
  info: {
    title: 'Pizza Delivery MERN',
    version: 1,
    description: 'An API to order pizza and user registration',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    contact: {
      name: 'Shubham Pawar',
      url: 'https://github.com/shubham-cpp',
      email: 'shubhampawar3007@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:4000',
      description: 'Laptop localhost',
    },
    {
      url: 'https://medale-poc-2.el.r.appspot.com/',
      description: 'Gcloud instance',
    },
    {
      url: 'https://react-poc2.azurewebsites.net/',
      description: 'Azure cloud instance',
    },
  ],
  schemes: ['http', 'https'],
  tags: [
    {
      name: 'Users',
      description: 'An api for fetching,deleting,adding users',
    },
    {
      name: 'Pizza',
      description: 'An api for fetching,deleting,adding pizzas',
    },
    {
      name: 'Order',
      description: 'An api for fetching,adding order',
    },
  ],
  components: {
    schemas: {
      Users: {
        type: 'object',
        required: ['name', 'age', 'phone', 'password'],
        properties: {
          _id: {
            type: 'string',
            description: 'An auto-generated id(via mongodb) for User',
          },
          name: {
            type: 'string',
            description: 'Name of the user',
          },
          age: {
            type: 'integer',
            description: 'Age of the user between 18 and 100',
            format: 'int32',
            minimum: 18,
            maximum: 100,
          },
          phone: {
            type: 'integer',
            description: 'Phone number which should be unique',
            format: 'int64',
          },
          password: {
            type: 'string',
            description:
              'Password for the user(this will be hased and then stored)',
            format: 'password',
          },
          email: {
            type: 'string',
            description:
              'Email(optional) address of the user. Also needs to be unique',
          },
          isAdmin: {
            type: 'boolean',
            description: 'Whether the current user is admin or not',
          },
        },
        example: {
          _id: '61a5afcae10876db1c98',
          name: 'Shubham Pawar',
          age: 22,
          phone: 9988776655,
          password: 'VeryStrong@123',
          email: 'shubhampawar3007@gmail.com',
          isAdmin: false,
        },
      },
      Reviews: {
        type: 'object',
        required: ['title', 'rating'],
        properties: {
          _id: {
            type: 'string',
            description: 'The auto-generated id(via mongodb) for review',
          },
          title: {
            type: 'string',
            description: 'Main title of the review',
            minimum: 4,
            maximum: 16,
          },
          desc: {
            type: 'string',
            description: 'description of the review',
            minimum: 4,
            maximum: 255,
          },
          rating: {
            type: 'integer',
            format: 'int32',
            description: 'Rating between 1-5',
            minimum: 1,
            maximum: 5,
          },
          userId: {
            type: 'string',
            description: "Object id of User from user's collection ",
          },
        },
        example: {
          title: 'Very good',
          desc: 'Nice quantity, excellent taste',
          rating: 4,
          userId: '423khsdafkljhzxcvblj12z',
        },
      },
      Pizza: {
        type: 'object',
        required: ['price', 'name', 'vegan'],
        properties: {
          _id: {
            type: 'string',
            description: 'The auto-generated id(via mongodb) for pizza',
          },
          name: {
            type: 'string',
            description: 'Name of the pizza(unique)',
          },
          price: {
            type: 'number',
            description: 'Price of pizza between 50 and 500',
            format: 'int64',
            minimum: 58,
            maximum: 500,
          },
          vegan: {
            type: 'boolean',
            description: 'Whether the pizza is veg or non-veg',
          },
          category: {
            type: 'string',
            description: 'Whether the pizza is veg or non-veg',
            enum: [
              'neapolitan',
              'sicilian',
              'detroit',
              'greek',
              'bagel',
              'generic',
            ],
          },
          imgUrl: {
            type: 'string',
            description: 'URL of the pizza',
          },
          reviews: {
            type: 'array',
            description: 'Array of all reviews for current pizza',
            $ref: refer('Reviews'),
          },
        },
        example: {
          _id: '687aszXVh213732xczxf',
          name: 'Chicken',
          price: 150,
          vegan: false,
          category: 'generic',
          imgUrl:
            'https://www.seekpng.com/png/detail/68-689158_pizza-png-high-quality-image-png-promoes-de.png',
          reviews: [
            {
              title: 'Very good',
              desc: 'Nice quantity, excellent taste',
              rating: 4,
              userId: '423khsdafkljhzxcvblj12z',
            },
            {
              title: "Could've  better",
              desc: 'Not enough spicy, Chicken was little undercooked',
              rating: 2,
              userId: '97afhhvczx1231797asd12z',
            },
          ],
        },
      },
    },
  },
  paths: {
    '/api/users': {
      get: {
        summary: 'Array of all users',
        description:
          'This will return a json array of all the user details we have in  database',
        tags: ['Users'],
        responses: {
          200: {
            description: 'Array of admission type',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: refer('Users'),
                  },
                },
              },
            },
          },
          500: {
            description: "Unable to fetch users' data from mongodb(database)",
          },
        },
      },
      post: {
        summary: 'Add new user to database(mongodb)',
        description: 'A Post request will add new user to database',
        tags: ['Users'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: refer('Users'),
              },
            },

            'application/x-www-form-urlencoded': {
              schema: {
                $ref: refer('Users'),
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User will be added to database',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  $ref: refer('Users'),
                  // ref: '#/components/schemas/Users',
                },
              },
            },
          },
          422: {
            description:
              "Validation errors. Meaning we did'nt submit valid data",
          },
          409: {
            description:
              'A user with submitted phone-number/email already exists',
          },
          500: {
            description:
              "Server might be down, so we're unable to add new user ",
          },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
              required: true,
              description: 'Id of user to search',
            },
          },
        ],
        summary: 'Details of single user',
        description: 'This will return a json object of user with specified id',
        tags: ['Users'],
        responses: {
          200: {
            description: 'Specific user details',
            content: {
              'application/json': {
                schema: {
                  $ref: refer('Users'),
                },
              },
            },
          },
          404: {
            description: 'Unable to find particular user  with provided _id',
          },
        },
      },
      delete: {
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
              required: true,
              description: 'Id of user to delete by',
            },
          },
        ],
        summary: 'Delete a single user using id',
        tags: ['Users'],
        responses: {
          202: {
            description: 'User deleted successfully',
          },
          404: {
            description: 'Unable to find and delete user with specified id',
          },
        },
      },
    },
    '/api/users/login': {
      post: {
        summary: 'User login',
        tags: ['Users'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  phone: {
                    type: 'integer',
                    format: 'int32',
                  },
                  password: {
                    type: 'string',
                    format: 'password',
                  },
                },
              },
            },
          },
        },

        responses: {
          202: {
            description: 'A User object',
            content: {
              'application/json': {
                schema: {
                  $ref: refer('Users'),
                },
                example: {
                  _id: '61a5afcae10876db1c98',
                  name: 'Shubham Pawar',
                  age: 22,
                  password: 'VeryStrong@123',
                },
              },
            },
          },
          422: {
            description: 'Provided details were invalid',
          },
          405: {
            description: 'Invalid phone or password',
          },
          401: {
            description: 'Invalid phone or password',
          },
          500: {
            description: 'Server might be down so cant process the request',
          },
        },
      },
    },
  },
};
export default swaggerOptions;
