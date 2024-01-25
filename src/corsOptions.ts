const corsOptions = {
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	origin: ['http://localhost:3000', 'http://localhost:4173', 'https://pickside.net'],
	credentials: true,
}

export default corsOptions
