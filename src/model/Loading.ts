class Loading implements LoadingI {
  animating: boolean;

  text: string;

  constructor(animating = false, text = 'loading...') {
    this.animating = animating;
    this.text = text;
  }
}

export default Loading;
