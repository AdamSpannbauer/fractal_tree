let w = 640
let h = 480

let min_len = 1
let delta_len = -5
let angle = 30
let n_branch = 2

let grow_rate = 2
let branches = []

let bg

function setup() {
	createCanvas(w, h)
	background(200)
	
	angleMode(DEGREES)
	imageMode(CENTER)

	translate(w / 2, h / 2)
	strokeWeight(3)
	stroke(0)
	
	let branch = new Branch(0, h / 2, h / 8, 0)
	branches.push(branch)
}


function draw() {
	translate(w / 2, h / 2)

	for (let i = 0; i < branches.length; i++) {
		let branch = branches[i]
		branch.draw()
		
		if (branch.grown) {
			branches.splice(i, 1)

			let x = branch.x2
			let y = branch.y2
			let len = branch.len + delta_len
			let a1 = branch.angle - angle
			let a2 = branch.angle + angle

			if (len > min_len) {
				for (let j = 0; j < n_branch; j++) {
					let a = map(j, 0, n_branch - 1, a1, a2)
					let b = new Branch(x, y, len, a)
					branches.push(b)
				}
			}
		}
	}
}


function array_equal(x, y) {
	if (x.length != y.length) {
		return false
	}

	for (let i = 0; i < x.length; i++) {
		if (x[i] != y[i]) {
			return false
		}
	}
	return true
}


class Branch {
	constructor(x, y, len, angle) {
		let dx = len * sin(angle)
		let dy = len * cos(angle)
		
		this.x1 = x
		this.y1 = y
		this.x2 = x - dx
		this.y2 = y - dy
		
		this.len = 0
		this.max_len = len
		this.angle = angle

		this.grown = false
	}

	draw() {
		let x2 = this.x2
		let y2 = this.y2

		if (this.len < this.max_len) {
			this.len += grow_rate
			this.len = min([this.len, this.max_len])

			let dx = this.len * sin(this.angle)
			let dy = this.len * cos(this.angle)

			x2 = this.x1 - dx
			y2 = this.y1 - dy
		} else {
			this.grown = true
		}

		line(this.x1, this.y1, x2, y2)
		push()
		fill(100, 200, 100)
		strokeWeight(0)
		ellipse(x2, y2, 4, 4)
		pop()
	}
}
