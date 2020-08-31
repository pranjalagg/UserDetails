var userData

const url = 'https://5w05g4ddb1.execute-api.ap-south-1.amazonaws.com/dev/profile/listAll'

fetch(url)
	.then(res => res.json())
	.then((d) => {
		userData = d.list
		removeLoading()
	})
	.catch(err => console.log('Error: ' + err))


function removeLoading() {
	let loading = document.getElementById('loading')
	document.getElementById('first_button').disabled = false

	loading.remove()
}

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


function createTable(table) {
	for (let user of userData) {
		let row = table.insertRow();
		row.setAttribute('class', 'User')

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
}

function convertDate(date) {
	var split = date.split("/");
	return (split[2] + split[1] + split[0]);
}

function sortUsers() {
	console.log('sortUsers')

	userData.sort(function(a, b) {
		if (a.status == b.status) {
			return (convertDate(a.date) > convertDate(b.date)) ? 1 : -1
		}
		return (a.status > b.status) ? 1 : -1
	})

	// console.log(userData)

}

function generateTable() {
	let body = document.getElementsByTagName('body')[0]

	let table = document.createElement('table')

	createTable(table)

	let firstButton = document.getElementById('first_button')
	firstButton.remove()

	let sortButton = document.createElement('button')
	let sortButtonText = document.createTextNode('Sort')
	sortButton.setAttribute('onclick', 'sortUsers()')

	sortButton.appendChild(sortButtonText)

	body.appendChild(table)
	body.appendChild(sortButton)

}