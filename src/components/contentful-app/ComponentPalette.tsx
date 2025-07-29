'use client';

import { Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '@/styles/components/ComponentPalette.module.css';

const components = [
  {
    id: 'hero',
    title: 'Hero Block',
    description: 'Large banner with heading, subtitle, CTA and background image',
    icon: '🎯',
  },
  {
    id: 'twoColumn',
    title: 'Two Column Row',
    description: 'Left content with heading, subtitle, CTA and right image',
    icon: '📰',
  },
  {
    id: 'imageGrid',
    title: '2x2 Image Grid',
    description: 'Grid of four images in a 2x2 layout',
    icon: '🖼️',
  },
];

export default function ComponentPalette() {
  return (
    <div className={styles.palette}>
      <h3 className={styles.title}>Components</h3>
      <p className={styles.subtitle}>Drag components to the canvas</p>
      
<Droppable
  droppableId="palette"
  isDropDisabled={true}
  isCombineEnabled={false}
  ignoreContainerClipping={false}
>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={styles.componentList}>
            {components.map((component, index) => (
              <Draggable key={component.id} draggableId={component.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${styles.component} ${snapshot.isDragging ? styles.dragging : ''}`}
                  >
                    <div className={styles.componentIcon}>{component.icon}</div>
                    <div className={styles.componentInfo}>
                      <h4 className={styles.componentTitle}>{component.title}</h4>
                      <p className={styles.componentDescription}>{component.description}</p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
