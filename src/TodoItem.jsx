import React, { useState } from 'react';

export function TodoItem({completed, id, todoName, dueDate, tags, toggleTodo, deleteTodo}) {

    function formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short', // 'short' gives the abbreviated month name
          day: 'numeric',
        }).format(date);
      };

      return (
        <li style={styles.todoItem}>
            {/* Delete Button (X) */}
            <button 
                onClick={() => deleteTodo(id)} 
                style={styles.deleteButton}
            >
                X
            </button>
            <div className="todo-title" style={styles.todoTitle}>
              <input 
                type="checkbox" 
                checked={completed} 
                onChange={e => toggleTodo(id, e.target.checked)} 
              />
              {todoName}
            </div>
    
            {/* Display Tags */}
            <div className="tags">
              {tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <button 
                    key={index} 
                    className="tag-btn" 
                    style={styles.tagButton}
                  >
                    {tag}
                  </button>
                ))
              ) : (
                <span>No tags</span>
              )}
            </div>
    
            {/* Display Due Date */}
            {dueDate && <span style={styles.dueDate}>Due: {formatDate(dueDate)}</span>}
        </li>
      );
}

const styles = {
    todoItem: {
        position: 'relative', 
        padding: '10px',
        border: '1px solid #ddd',
        marginBottom: '10px',
        borderRadius: '4px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',  
      },
      deleteButton: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'red',
        fontSize: '16px',
        cursor: 'pointer', 
        padding: '0',
        margin: '0',
        lineHeight: '1',
      },
    todoTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#333', 
        marginBottom: '5px', 
        lineHeight: '1.4',
      },
    dueDate: {
        position: 'absolute',
        bottom: '5px',
        right: '10px',
        fontSize: '12px',
        color: '#888',
    },
    tagButton: {
        margin: '0 5px',
        backgroundColor: '#e0e0e0',
        color: '#666',
        border: 'none',
        padding: '2px 8px',  
        cursor: 'pointer',
        borderRadius: '12px',  
        fontSize: '12px', 
        textTransform: 'capitalize', 
        transition: 'background-color 0.3s',  
      },
      
    }