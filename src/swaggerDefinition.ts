const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Pickside API',
		version: '1.0.0',
		description: 'The Pickside API',
	},
	host: `localhost:8000/api/v1`,
	basePath: '/',
	servers: [
		{
			url: 'localhost:8000/api/v1',
			description: 'Development server',
		},
	],
}

export default swaggerDefinition
