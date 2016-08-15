import Controller from '../controllers/Controller';

export default [

	{

		url: '/notify/:id',
		action: Controller.start.bind(Controller),
		method: 'get'

	},

	{

		url: '/notify/:id',
		action: Controller.send.bind(Controller),
		method: 'post'

	}

];
