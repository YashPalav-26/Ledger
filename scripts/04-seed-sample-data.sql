-- Insert sample data for development and testing
USE notes_manager;

-- Sample users (passwords are hashed versions of 'password123')
INSERT INTO users (email, password, first_name, last_name) VALUES
('john.doe@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe'),
('jane.smith@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith');

-- Sample notes
INSERT INTO notes (user_id, title, content, category, is_favorite) VALUES
(1, 'Welcome to Notes Manager', 'This is your first note! You can create, edit, and organize your thoughts here.', 'general', TRUE),
(1, 'Project Ideas', 'List of project ideas:\n- Build a weather app\n- Create a task manager\n- Design a portfolio website', 'work', FALSE),
(1, 'Shopping List', 'Groceries needed:\n- Milk\n- Bread\n- Eggs\n- Fruits', 'personal', FALSE),
(2, 'Meeting Notes', 'Team meeting discussion points:\n- Q4 goals\n- Budget planning\n- New hire process', 'work', TRUE),
(2, 'Book Recommendations', 'Books to read:\n- The Pragmatic Programmer\n- Clean Code\n- Design Patterns', 'personal', FALSE);
