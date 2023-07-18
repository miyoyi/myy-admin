<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: 'customer'
    },
    iconUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { icon, iconUrl, title } = context.props
    const vnodes = []

    /* if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    } */
    if (iconUrl) {
      vnodes.push(<img class="menu-second-icon" src={iconUrl} />)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
