import Vue from 'vue'

let bus = new Vue({ name: 'EventBus' })

let _on = bus.$on
let _emit = bus.$emit

bus.$on = function (eventName) {
  if (bus._events[eventName]) { bus.$off(eventName) }
  _on.apply(bus, arguments)
}

bus.$emit = function () {
  _emit.apply(bus, arguments)
}

export default bus
