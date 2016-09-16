const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {

	var new_pos = []
	if (canvas != undefined) {
		new_pos = [(position[0] + velocity[0] * delta) % canvas.width,
			(position[1] + velocity[1] * delta) % canvas.height];
	}else {
		new_pos = [(position[0] + velocity[0] * delta),
			(position[1] + velocity[1] * delta)];
	}
	if (new_pos[0] < 0) {
		new_pos[0] = canvas.width;
	}
	if (new_pos[1] < 0) {
		new_pos[1] = canvas.height;
	}
	var new_velocity = [velocity[0] + acceleration[0] * delta, velocity[1] + acceleration[1] * delta]
	console.log(new_velocity)
    return { mass, acceleration, velocity: new_velocity, position: new_pos}
}

export default particle

export { update }
