// models/todo.js
var DefineMap = require("can-define/map/"),
	DefineList = require("can-define/list/"),
	set = require("can-set");

var Todo = DefineMap.extend("Todo", {
	id: "string",
	name: "string",
	complete: {
		type: "boolean",
		value: false
	},
	toggleComplete: function() {
		this.complete = !this.complete;
	}
});

Todo.List = DefineList.extend("TodoList", {
	"#": Todo,
	get active() {
		return this.filter({
			complete: false
		});
	},
	get complete() {
		return this.filter({
			complete: true
		});
	},
	get allComplete() {
		return this.length === this.complete.length;
	}
});

Todo.algebra = new set.Algebra(
	set.props.boolean("complete"),
	set.props.id("id"),
	set.props.sort("sort")
);

module.exports = Todo;
