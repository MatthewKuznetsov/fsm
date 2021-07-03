class FSM {

  state;
  transitions;
  _callbacks = [];
  _callbacksForTriggers = {};
  
  constructor(transitions, initial) {
    this.state = initial;
    this.transitions = transitions;
  }

  send(trigger) {
    const hasTrigger =
      this.transitions[this.state] && this.transitions[this.state][trigger];
    if (hasTrigger) {
      this.state = this.transitions[this.state][trigger];
      this._callbacks?.forEach(c => c(this.state));
      this._callbacksForTriggers[trigger]?.forEach(c => c(this.state));
    }
  }

  subscribe(callback, trigger) {
    if (trigger) {
      this._callbacksForTriggers[trigger] = this._callbacksForTriggers[trigger] || [];
      this._callbacksForTriggers[trigger].push(callback);
      return;
    }
    this._callbacks.push(callback);
  }

}

// When there is no conditioner in my flat
const flat296Transitions = {
  hot: {
    'night-has-come': 'cool',
  },
  cool: {
    'day-has-come': 'hot', 
  },
};

const flat296Machine = new FSM(flat296Transitions, 'cool');

flat296Machine.subscribe(e => console.log(e));
flat296Machine.subscribe(e => console.log(e), 'night-has-come');
flat296Machine.subscribe(e => console.log(e), 'day-has-come');

flat296Machine.send('day-has-come');
flat296Machine.send('day-has-come');
flat296Machine.send('day-has-come');
flat296Machine.send('night-has-come');
flat296Machine.send('day-has-come');
flat296Machine.send('night-has-come');
flat296Machine.send('night-has-come');
