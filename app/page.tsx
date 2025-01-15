"use client"

import { useState, useEffect } from "react"

import { Item } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { fetchItems, createItem, updateItem, deleteItem } from "../utils/api"
import {ItemForm} from "@/components/item-form"
import {ItemList} from "@/components/item-list"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error)
  }, [])

  const handleAddItem = async (newItem: Omit<Item, 'id'>) => {
    try {
      const result = await createItem(newItem)
      setItems([...items, { ...newItem, id: result.id }])
      toast({
        title: "Item added",
        description: "New item has been added successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to add item.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateItem = async (updatedItem: Omit<Item, 'id'>) => {
    if (!editingItem) return
    try {
      await updateItem({ ...updatedItem, id: editingItem.id })
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...item, ...updatedItem } : item
      ))
      setEditingItem(null)
      toast({
        title: "Item updated",
        description: "The item has been updated successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id)
      setItems(items.filter(item => item.id !== id))
      toast({
        title: "Item deleted",
        description: "The item has been deleted successfully.",
        variant: "destructive",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">CRUD Application</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Item" : "Add New Item"}</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemForm 
              item={editingItem || undefined} 
              onSubmit={editingItem ? handleUpdateItem : handleAddItem} 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Item List</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemList 
              items={items} 
              onEdit={setEditingItem} 
              onDelete={handleDeleteItem} 
            />
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}

