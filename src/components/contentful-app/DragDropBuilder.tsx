'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/types/redux';
import { pushToHistory, undo, redo } from '@/store/historySlice';
import { reorderComponents, addComponent, removeComponent } from '@/store/layoutSlice';
import ComponentPalette from './ComponentPalette';
import ComponentPreview from './ComponentPreview';
import styles from '@/styles/components/DragDropBuilder.module.css';

export default function DragDropBuilder() {
  const dispatch = useDispatch();
  const { present: layoutState, past, future } = useSelector((state: RootState) => state.layout);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    // Save current state to history before making changes
    dispatch(pushToHistory(layoutState));
    
    if (source.droppableId === 'palette' && destination.droppableId === 'builder') {
      // Adding new component from palette
      const componentType = draggableId as 'hero' | 'twoColumn' | 'imageGrid';
      const newComponent = createDefaultComponent(componentType, destination.index);
      dispatch(addComponent(newComponent));
    } else if (source.droppableId === 'builder' && destination.droppableId === 'builder') {
      // Reordering existing components
      const items = Array.from(layoutState.components);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      
      // Update positions
      const updatedItems = items.map((item, index) => ({
        ...item,
        position: index,
      }));
      
      dispatch(reorderComponents(updatedItems));
    }
  };

  const createDefaultComponent = (type: 'hero' | 'twoColumn' | 'imageGrid', position: number) => {
    const id = `${type}-${Date.now()}`;
    const defaultData = {
      hero: {
        heading: 'Hero Heading',
        subtitle: 'Hero subtitle text goes here',
        ctaText: 'Call to Action',
        ctaUrl: '#',
        backgroundImage: { url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080', title: 'Hero Background' },
      },
      twoColumn: {
        heading: 'Two Column Heading',
        subtitle: 'Two column subtitle text goes here',
        ctaText: 'Learn More',
        ctaUrl: '#',
        image: { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400', title: 'Two Column Image' },
      },
      imageGrid: {
        images: [
          { sys: { id: '1' }, url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300', title: 'Grid Image 1' },
          { sys: { id: '2' }, url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300', title: 'Grid Image 2' },
          { sys: { id: '3' }, url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300', title: 'Grid Image 3' },
          { sys: { id: '4' }, url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300', title: 'Grid Image 4' },
        ],
      },
    };
    return {
      id,
      type,
      data: defaultData[type],
      position,
    };
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleRemoveComponent = (id: string) => {
    dispatch(pushToHistory(layoutState));
    dispatch(removeComponent(id));
  };

  if (!mounted) {
    return (
      <div className={styles.loading}>
        <p>Loading page builder...</p>
      </div>
    );
  }

  return (
    <div className={styles.builder}>
      <div className={styles.toolbar}>
        <div className={styles.historyControls}>
          <button
            onClick={handleUndo}
            disabled={past.length === 0}
            className={styles.historyButton}
            title="Undo"
          >
            ↶ Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={future.length === 0}
            className={styles.historyButton}
            title="Redo"
          >
            ↷ Redo
          </button>
        </div>
        
        <div className={styles.saveStatus}>
          {layoutState.isAutoSaving && (
            <span className={styles.autoSaving}>Auto-saving...</span>
          )}
          {layoutState.lastSaved && !layoutState.isDirty && (
            <span className={styles.saved}>
              Saved {new Date(layoutState.lastSaved).toLocaleTimeString()}
            </span>
          )}
          {layoutState.isDirty && !layoutState.isAutoSaving && (
            <span className={styles.unsaved}>Unsaved changes</span>
          )}
        </div>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <ComponentPalette />
          </div>
          
          <div className={styles.canvas}>
<Droppable
  droppableId="builder"
  isDropDisabled={false}
  isCombineEnabled={false}
  ignoreContainerClipping={false}
>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${styles.dropZone} ${snapshot.isDraggingOver ? styles.dragOver : ''}`}
                >
                  {layoutState.components.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>Drag components from the sidebar to start building your page</p>
                    </div>
                  )}
                  
                  {layoutState.components.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`${styles.componentWrapper} ${snapshot.isDragging ? styles.dragging : ''}`}
                        >
                          <div className={styles.componentControls}>
                            <div {...provided.dragHandleProps} className={styles.dragHandle}>
                              ⋮⋮
                            </div>
                            <button
                              onClick={() => handleRemoveComponent(component.id)}
                              className={styles.removeButton}
                              title="Remove component"
                            >
                              ×
                            </button>
                          </div>
                          <ComponentPreview component={component} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
