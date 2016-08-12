import Controller from '../controllers/Controller';

export default [

	{

		url: '/start/:id',
		action: Controller.start.bind(Controller),
		method: 'get'

	},

	{

		url: '/sendOk/:id',
		action: Controller.sendOk.bind(Controller),
		method: 'get'

	},

	{

		url: '/sendError/:id',
		action: Controller.sendError.bind(Controller),
		method: 'get'

	}

];


