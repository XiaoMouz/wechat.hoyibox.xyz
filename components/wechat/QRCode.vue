<script lang="ts">
import qrcode from 'tc-qrcode'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h('img', {
        src: qrcode.encodeAsBase64(`https://${location.host}/link/${props.id}`),
        alt: 'QR Code',
      })
  },
}
</script>
