var userData

const url = 'https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll'

fetch(url)
	.then(res => res.json())
	.then((d) => {
		userData = d.list
	})
	.catch(err => console.log('Error: ' + err))


// var data
// const appendData(d) => {
// 	data = d.list
// 	data.forEach(user => {

// 	})
// }

function generateTHead(table) {
	headings = ['Name', 'Date', 'Status']

	let thead = table.createTHead();
	let row = thead.insertRow();
	for (let head of headings) {
		let th = document.createElement('th')
		let text = document.createTextNode(head)
		th.appendChild(text);
		row.appendChild(th);
	}

}


function generateTable() {
	let body = document.getElementsByTagName('body')[0]

	let table = document.createElement('table')

	// generateTHead(table)
	for (let user of userData) {
		let row = table.insertRow();

		for (key in user) {
			if (key === 'name' || key === 'status' || key === 'date')
			{
				let cell = row.insertCell();
				let text = document.createTextNode(user[key]);
				cell.appendChild(text)
			}
		}
	}

	generateTHead(table)
	let firstButton = document.getElementById('first_button')
	firstButton.remove()



	body.appendChild(table)
}