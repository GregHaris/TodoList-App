// taskFactory.js
export default function createTask(title, description, completed = false) {
  return {
    title,
    description,
    completed,
    complete() {
      this.completed = true;
    },
    toString() {
      return `${this.title}: ${this.description} (${this.completed ? 'Completed' : 'Pending'})`;
    }
  };
}