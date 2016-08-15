class Controller {

	constructor() {
		
		// массив состояний
		this.arr = {};

	}

	start(req, res) {

		res.writeHead(200, {
			'Content-Type': 'text/event-stream; charset=utf-8',
			'Cache-Control': 'no-cache'
		});

        // id процесса
		const id = req.params.id;

        // проверка на существование процесса с указаным id
		if (this.arr[id]) {

			res.write('data: Процес уже запущен!' + '\n\n');
			return;

		}

		this.arr[id] = 'Соединение создано!';
		
		let timer = setInterval(write.bind(this), 1000);

		function write() {

			if (this.arr[id] === 'stop\n\n') {

				clearInterval(timer);
				res.end();
				return;

			}

			res.write('data: ' + this.arr[id] + '\n\n');

		}

	}

	send(req, res) {

		const id = req.params.id;
		const status = req.body.status;

		this.arr[id] = status + '\n\n';

		res.status(200).send({ status });
		
	}

}

export default new Controller();
