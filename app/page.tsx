"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { Header } from "../components/Header"
import { ItemCard } from "../components/item-card"
import { ItemForm } from "../components/item-form"
import { Item } from "../types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { fetchItems, createItem, updateItem, deleteItem } from "../utils/api"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchItems().then(setItems).catch(console.error)
  }, [])

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  const handleSearch = (query: string) => {
    const filtered = items.filter(
      item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredItems(filtered)
  }

  const handleAddItem = async (newItem: Omit<Item, 'id'>) => {
    setIsLoading(true)
    try {
      const result = await createItem(newItem)
      setItems([...items, { ...newItem, id: result.id }])
      toast({
        title: "Success!",
        description: "Item added successfully.",
        className: "bg-green-50 border-green-200",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to add item.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateItem = async (updatedItem: Omit<Item, 'id'>) => {
    if (!editingItem) return
    setIsLoading(true)
    try {
      await updateItem({ ...updatedItem, id: editingItem.id })
      setItems(items.map(item =>
        item.id === editingItem.id ? { ...item, ...updatedItem } : item
      ))
      setEditingItem(null)
      toast({
        title: "Success!",
        description: "Item updated successfully.",
        className: "bg-green-50 border-green-200",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to update item.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id)
      setItems(items.filter(item => item.id !== id))
      toast({
        title: "Success!",
        description: "Item deleted successfully.",
        className: "bg-green-50 border-green-200",
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header onSearch={handleSearch} />
      <main className="container mx-auto p-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="md:sticky md:top-4 h-fit">
            <CardHeader>
              <CardTitle>{editingItem ? "Edit Item" : "Add New Item"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ItemForm
                item={editingItem || undefined}
                onSubmit={editingItem ? handleUpdateItem : handleAddItem}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Items List</h2>
            <AnimatePresence>
              {filteredItems.length > 0 ? (
                <div className="grid gap-4">
                  {filteredItems.map(item => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onEdit={setEditingItem}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No items found. Add your first item!
                  </CardContent>
                </Card>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

