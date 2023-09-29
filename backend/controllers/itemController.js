const db = require('../config/db')

// Create an item
exports.createItem = (req, res) => {
  const { name, description } = req.body
  // const ownerId = req.user.id
  // Insert the item into the database
  db.query(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    (error, results) => {
      if (error) {
        console.error('Database query error: ' + error)
        return res.status(500).json({ message: 'Internal server error' })
      }

      res.status(201).json({ message: 'Item created successfully' })
    }
  )
}

// Read all items
exports.getItems = (req, res) => {
  // Retrieve items from the database
  db.query('SELECT * FROM items', (error, results) => {
    if (error) {
      console.error('Database query error: ' + error)
      return res.status(500).json({ message: 'Internal server error' })
    }

    res.status(200).json(results)
  })
}

// Update an item by ID
exports.updateItem = (req, res) => {
  const itemId = req.params.id
  const { name, description } = req.body

  // Update the item in the database
  db.query(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    [name, description, itemId],
    (error, results) => {
      if (error) {
        console.error('Database query error: ' + error)
        return res.status(500).json({ message: 'Internal server error' })
      }

      res.status(200).json({ message: 'Item updated successfully' })
    }
  )
}
exports.getOneItem = (req, res) => {
  const itemId = req.params.id

  // get one item from the database
  db.query('SELECT * FROM items WHERE id = ?', [itemId], (error, results) => {
    if (error) {
      console.error('Database query error: ' + error)
      return res.status(500).json({ message: 'Internal server error' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const item = results[0] // Assuming you want to return the first matching item
    res.status(200).json({ item })
  })
}

// Delete an item by ID
exports.deleteItem = (req, res) => {
  const itemId = req.params.id

  // Delete the item from the database
  db.query('DELETE FROM items WHERE id = ?', [itemId], (error, results) => {
    if (error) {
      console.error('Database query error: ' + error)
      return res.status(500).json({ message: 'Internal server error' })
    }

    res.status(200).json({ message: 'Item deleted successfully' })
  })
}

exports.search = (req, res) => {
  const searchTerm = req.query.term

  db.query(
    'SELECT * FROM items WHERE name LIKE ? OR description LIKE ?',
    [`%${searchTerm}%`, `%${searchTerm}%`],
    (error, results) => {
      if (error) {
        console.error('Database query error: ' + error)
        return res.status(500).json({ message: 'Internal server error' })
      }

      res.status(200).json(results)
    }
  )
}
