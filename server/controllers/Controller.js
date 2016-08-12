class Controller {

	constructor() {

		this.arr = [];

	}

	start(req, res) {

		res.writeHead(200, {
			'Content-Type': 'text/event-stream; charset=utf-8',
			'Cache-Control': 'no-cache'
		});

		const id = req.params.id;

		for(let i = 0; i < this.arr.length; i++) {

			if (id == this.arr[i].id) {

				res.write('data: Процес уже запущен!' + '\n\n');
				return;

			}

		}

		this.arr.push({ id, status: 'Соединение создано!' });

		const index = this.arr.length - 1;

		let timer = setInterval(write.bind(this), 1000);

		function write() {

			res.write('data: ' + this.arr[index].status + '\n\n');

		}

	}

	sendOk(req, res) {

		const id = req.params.id;

		this.arr = this.arr.map((elem) => {

			if (id == elem.id) {
				
				return { id, status: 'Ok\n\n' };

			}

		});

	}

	sendError(req, res) {

		const id = req.params.id;

		this.arr = this.arr.map((elem) => {

			if (id == elem.id) {

				return { id, status: 'Error\n\n' };

			}

		});

	}

}

export default new Controller();
