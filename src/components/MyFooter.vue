<template>
	<div class="todo-footer" v-show="total">
		<label>
			<input type="checkbox" v-model="isAll" />
		</label>
		<span>
			<span>已完成{{ doneTotal }}</span> / 全部{{ total }}
		</span>
		<button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
	</div>
</template>

<script>
export default {
	name: "MyFooter",
	props: ["todos"],
	computed: {
		//完成总数
		total() {
			return this.todos.length;
		},
		//已经完成数量
		doneTotal() {
			return this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0);
		},
		//是否全选
		isAll: {
			//全选框是否勾选
			get() {
				return this.doneTotal === this.todos.length && this.total > 0;
			},
			set(value) {
				this.$emit("checkAllTodo", value);
			},
		},
	},
	methods: {
		clearAll() {
			if (confirm("确定要删除已选待办事项吗？")) {
				this.$emit("clearAllTodo");
			}
		},
	},
};
</script>

<style>
.todo-footer {
	height: 40px;
	line-height: 40px;
	padding-left: 6px;
	margin-top: 5px;
}

.todo-footer label {
	display: inline-block;
	margin-right: 20px;
	cursor: pointer;
}

.todo-footer label input {
	position: relative;
	top: -1px;
	vertical-align: middle;
	margin-right: 5px;
}

.todo-footer button {
	float: right;
	margin-top: 5px;
}
</style>