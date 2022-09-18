<template>
	<li>
		<label>
			<input
				type="checkbox"
				:checked="todo.done"
				@change="handleCheck(todo.id)"
			/>
			<span v-show="!todo.isEdit">{{ todo.title }}</span>
			<input
				type="text"
				v-show="todo.isEdit"
				:value="todo.title"
				@blur="handleBlur(todo, $event)"
				ref="inputTitle"
			/>
		</label>
		<button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
		<button
			v-show="!todo.isEdit"
			class="btn btn-edit"
			@click="handleEdit(todo)"
		>
			编辑
		</button>
	</li>
</template>

<script>
export default {
	name: "MyItem",
	//声明接受todo对象
	props: ["todo"],
	methods: {
		//选择是否勾选待办事项
		handleCheck(id) {
			//将选择的todo对象中的done取反
			this.$bus.$emit("checkTodo", id);
		},
		//删除待办事项
		handleDelete(id) {
			if (confirm("确定删除吗？"))
				this.$bus.$emit("deleteTodo", id);
		},
		//编辑待办事项
		handleEdit(todo) {
			if (todo.hasOwnProperty.call(todo, "isEdit")) {
				todo.isEdit = true;
			} else {
				this.$set(todo, "isEdit", true);
			}
			this.$nextTick(function () {
				this.$refs.inputTitle.focus();
			});
		},
		//失去焦点即编辑成功
		handleBlur(todo, e) {
			todo.isEdit = false;
			if (!e.target.value.trim()) return alert("输入不能为空！");
			this.$bus.$emit("updateTodo", todo.id, e.target.value);
		},
	},
};
</script>

<style>

li {
	list-style: none;
	height: 36px;
	line-height: 36px;
	padding: 0 5px;
	border-bottom: 1px solid #ddd;
}

li label {
	float: left;
	cursor: pointer;
}

li label li input {
	vertical-align: middle;
	margin-right: 6px;
	position: relative;
	top: -1px;
}

li button {
	float: right;
	display: none;
	margin-top: 3px;
}

li:before {
	content: initial;
}

li:last-child {
	border-bottom: none;
}

li:hover {
	background-color: #ddd;
}

li:hover button {
	display: block;
}
</style>