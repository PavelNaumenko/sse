class Controller {

	constructor() {

	    // массив состояний
		this.arr = [];

	}

	start(req, res) {

		res.writeHead(200, {
			'Content-Type': 'text/event-stream; charset=utf-8',
			'Cache-Control': 'no-cache'
		});

        // id процесса
		const id = req.params.id;

        // проверка на существование процесса с указаным id
		for (let i = 0; i < this.arr.length; i++) {

			if (id == this.arr[i].id) {

				res.write('data: Процес уже запущен!' + '\n\n');
				return;

			}

		}

		// добавление процесса в масив состояний
		this.arr.push({ id, status: 'Соединение создано!' });

        // запись в переменную номер процесса в массиве
		const index = this.arr.length - 1;

        // запуск отправителя состояний
		let timer = setInterval(write.bind(this), 1000);

		function write() {

			if (this.arr[index].status === 'stop\n\n') {

				clearInterval(timer);
				res.end();
				return;

			}

			res.write('data: ' + this.arr[index].status + '\n\n');

		}

	}

	send(req, res) {

		const id = req.params.id;
		const status = req.body.status;

		this.arr = this.arr.map((elem) => {

			if (id == elem.id) {

				return { id, status: `${status}` + '\n\n' };

			}

		});

		res.status(200).send({ status });

	}

}

export default new Controller();
