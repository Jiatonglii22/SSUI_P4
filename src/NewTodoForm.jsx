import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function NewTodoForm( {onSubmit} ) {
    const [todoName, setTodoName] = useState(''); //task 
    const [dueDate, setDueDate] = useState(''); //due date
    const [tags, setTags] = useState(() => {
        const localValue = localStorage.getItem("TAGS")
        if (localValue === null) return []
        return JSON.parse(localValue)
      }) //tags

    useEffect(() => {
        localStorage.setItem("TAGS", JSON.stringify(tags))
      }, [tags])

    const [selectedTags, setSelectedTags] = useState([]); 
    const [newTag, setNewTag] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        onSubmit(todoName, dueDate, selectedTags)

         //reset fields   
        setDueDate(""); 
        setTodoName("");   
        setSelectedTags([]); 
      }

    // Handle adding a new tag
    const handleAddTag = (e) => {
        e.preventDefault();
        if (newTag.trim() === '' || tags.includes(newTag.trim())) return;
        setTags([...tags, newTag.trim()]);
        setNewTag('');
    };

     // Handle removing a tag
    const handleRemoveTag = (tag) => {
        // Remove the tag from the list of available tags
        const updatedTags = tags.filter(t => t !== tag);
        setTags(updatedTags);

        // Remove the tag from selected tags if it was selected
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };
     // Handle selecting a tag
    const handleTagSelection = (tag, e) => {
        e.preventDefault();
        if (selectedTags.includes(tag)) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
        setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
    <form className="new-item-form">
      <div className="form">

        <label htmlFor="item"> New Todo: </label>
        <input
        className='todo-input'
        type="text"
        placeholder="Task name"
        value={todoName}
        onChange={e => setTodoName(e.target.value)}
        />
        <div>
        <label>Due Date:</label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          dateFormat="yyyy/MM/dd"
          isClearable
          placeholderText="Select a due date"
        />
      </div>
         {/* Tag selection */}
      <div>
        <label>Tags:</label>
        {tags.map((tag) => (
          <button
            key={tag}
            type="selected-tag-button"
            onClick={(e) => handleTagSelection(tag, e)}
            onDoubleClick={() => handleRemoveTag(tag)}  // Remove tag on double-click
            className='tag-selection'
            style={{ 
              backgroundColor: selectedTags.includes(tag) ? '#E0B1CB' : '#ddd',
              color: '#5E548E', 
              border: 'none', 
              margin: '5px',
              padding: '5px 10px',
              cursor: 'pointer',
            }}
          >
            {tag}
          </button>
        ))}
      {/* Input for new tag */}
        <input
          className="tag-input"
          type="text"
          placeholder="Enter a new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button className="btn-add-tag" onClick={(e) => handleAddTag(e)}>Add Tag</button>
      </div>
      </div>
      <div className="spacer"></div>
      <button className="todo-btn" onClick={handleSubmit}> Add Todo</button>

    </form>
    )
}