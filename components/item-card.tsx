import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import { Item } from "../types"
import { motion } from "framer-motion"

interface ItemCardProps {
  item: Item
  onEdit: (item: Item) => void
  onDelete: (id: number) => void
}

export function ItemCard({ item, onEdit, onDelete }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(item)}
            className="hover:bg-purple-50 hover:text-purple-600"
          >
            <Pencil className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

