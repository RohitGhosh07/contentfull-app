import { configureStore } from '@reduxjs/toolkit'
import layoutReducer, { addComponent, removeComponent, reorderComponents } from '@/store/layoutSlice'
import { ComponentState } from '@/types/redux'

const mockComponent: ComponentState = {
  id: 'test-1',
  type: 'hero',
  data: {
    heading: 'Test Heading',
    subtitle: 'Test Subtitle',
    ctaText: 'Test CTA',
    ctaUrl: '/test',
    backgroundImage: { url: 'test.jpg', title: 'Test' },
  },
  position: 0,
}

describe('layoutSlice', () => {
  let store: any

  beforeEach(() => {
    store = configureStore({
      reducer: {
        layout: layoutReducer,
      },
    })
  })

  it('should add a component', () => {
    store.dispatch(addComponent(mockComponent))
    
    const state = store.getState().layout
    expect(state.components).toHaveLength(1)
    expect(state.components[0]).toEqual(mockComponent)
    expect(state.isDirty).toBe(true)
  })

  it('should remove a component', () => {
    store.dispatch(addComponent(mockComponent))
    store.dispatch(removeComponent('test-1'))
    
    const state = store.getState().layout
    expect(state.components).toHaveLength(0)
    expect(state.isDirty).toBe(true)
  })

  it('should reorder components', () => {
    const component2: ComponentState = { ...mockComponent, id: 'test-2', position: 1 }
    
    store.dispatch(addComponent(mockComponent))
    store.dispatch(addComponent(component2))
    store.dispatch(reorderComponents([component2, mockComponent]))
    
    const state = store.getState().layout
    expect(state.components[0].id).toBe('test-2')
    expect(state.components[1].id).toBe('test-1')
    expect(state.isDirty).toBe(true)
  })
})
