import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-input/paper-input.js";

/**
 * @customElement
 * @polymer
 */
class FormField extends PolymerElement {
  static get template() {
    return html`
      <style>
        .input-container {
          display: flex;
          flex-direction: column;
          margin-right: 16px;
          width: 100%;
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 10px;
        }

        .error {
          color: #dd2c00;
          font-size: 12px;
          margin: 10px 0;
        }

        .button-group {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .button-group button:first-child {
          margin-right: 8px;
        }

        button {
          background-color: #333;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        button:hover {
          background-color: #fff;
          color: #333;
          border: 1px solid #333;
        }

        .button-group button {
          padding: 6px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .button-group button:hover {
          background-color: #3e8e41;
        }

        .button-group button:first-child {
          margin-right: 8px;
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          text-align: center;
        }
      </style>

      <div class="input-container">
        <h3>Enter employee details</h3>
        <paper-input
          label="First Name"
          id="task1"
          value="{{task1}}"
          error-message="Please enter a valid first name"
          invalid="{{first}}"
        ></paper-input>
        <paper-input
          label="Last Name"
          id="task2"
          value="{{task2}}"
          error-message="Please enter a valid last name"
          invalid="{{last}}"
        ></paper-input>
        <paper-input
          label="Phone no."
          id="task3"
          value="{{task3}}"
          error-message="Phone No. should be a 10-digit number"
          invalid="{{phone}}"
        ></paper-input>
        <paper-input
          label="Employee no."
          id="task4"
          value="{{task4}}"
          error-message="Employee ID should contain at least 5 characters of letters, numbers, underscores, or hyphens"
          invalid="{{id}}"
        ></paper-input>
        <template is="dom-if" if="[[!submit]]">
          <span class="error">Please fill in all required fields correctly</span>
        </template>
        <template is="dom-if" if="[[!modify]]">
          <span class="error">Please modify and submit</span>
        </template>
        <div class="button-group">
          <button on-click="submitTasks">Submit</button>
          <button on-click="clearTasks">Clear</button>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      task1: {
        type: String,
        value: "",
      },
      task2: {
        type: String,
        value: "",
      },
      task3: {
        type: String,
        value: "",
      },
      task4: {
        type: String,
        value: "",
      },
      tasks: {
        type: Array,
        value: [],
      },
      taskList: {
        type: Array,
        value: [],
        notify: true,
      },
      editIndex: {
        type: Number,
        value: -1,
        observer: "_handleEmployeeEdited",
      },
    };
  }

  _handleEmployeeEdited() {
    const index = this.editIndex;
    if (index >= 0) {
      for (let i = 1; i <= 4; i++) {
        this["task" + i] = this.taskList[index][i-1].task;
      }      
    }
  }

  validateForm() {
    const [task1, task2, task3, task4] = [this.task1, this.task2, this.task3, this.task4];
    let isValid = true;

    if (!task1.trim()) {
      this.first = true;
      isValid = false;
    } else {
      this.first = false;
    }

    if (!task2.trim()) {
      this.last = true;
      isValid = false;
    } else {
      this.last = false;
    }

    if (!this.validatePhoneNo(task3)) {
      this.phone = true;
      isValid = false;
    } else {
      this.phone = false;
    }

    if (!this.validateEmployeeID(task4)) {
      this.id = true;
      isValid = false;
    } else {
      this.id = false;
    }
    if (!isValid) {
      this.submit = false;
    } else {
      this.submit = true;
    }
    return isValid;
  }

  submitTasks() {
    if (this.validateForm()) {
      this.clearErrorMessages();
      if (this.editIndex >= 0) {
        const index = this.editIndex;
        const fieldTasks = [this.task1, this.task2, this.task3, this.task4];
        const editTasks = this.taskList[index].map((item) => item.task);
        if (this.equalsCheck(fieldTasks, editTasks)) {
          this.modify = false;
        } else {
          this.modify = true;
          const taskItems = [this.task1, this.task2, this.task3, this.task4];
          taskItems.forEach((task, i) => {
            this.set(`taskList.${index}.${i}.task`, task);
          });          
          this.editIndex = -1;
          // Clear the input fields
          this.clearInputs();
        }
      } else {
        this.tasks = [];
        // Push the tasks to the tasks array
        this.push(
          "tasks",
          { task: this.task1 },
          { task: this.task2 },
          { task: this.task3 },
          { task: this.task4 }
        );
        this.push("taskList", this.tasks);
        // Clear the input fields
        this.clearInputs();
      }
    }
  }
  clearInputs() {
    for (let i = 1; i <= 4; i++) {
      this["task" + i] = "";
    }
  }

  clearTasks() {
    this.clearInputs();
    this.clearErrorMessages();
    this.editIndex = -1;
  }

  clearErrorMessages() {
    this.shadowRoot.querySelectorAll(".error").forEach((error) => {
      error.textContent = "";
    });
  }

  equalsCheck(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  validatePhoneNo(phoneNo) {
    const phoneNoRegex = /^\d{10}$/; // Matches 10 digits only
    return phoneNoRegex.test(phoneNo);
  }

  validateEmployeeID(employeeID) {
    const employeeIDRegex = /^[a-zA-Z0-9_-]{5,}$/; // Matches at least 5 characters of letters, numbers, underscores, or hyphens
    return employeeIDRegex.test(employeeID);
  }
}

window.customElements.define("form-field", FormField);
