const corsOptions = {
	methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default corsOptions
