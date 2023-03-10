export type IDirection = 'up' | 'down'

export interface IOnStepEnterOrExit {
  // The DOM node of the step that was triggered
  element: Element
  // the ID of the StorySteps instance
  storyStepsId: string
  // the data given in the step
  data: Record<any, any> | any[]
  // the `IntersectionObserver` entry
  entry: IntersectionObserverEntry
  // scroll directory
  direction: IDirection
}

export interface IOnStepProress extends IOnStepEnterOrExit {
  // the percent of completion of the step, 0 to 1
  progress: number
}
