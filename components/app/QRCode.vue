<script lang="ts">
import qrcode from 'tc-qrcode'

export default {
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () =>
      h('img', {
        src: qrcode.encodeAsBase64(props.data),
        alt: 'QR Code',
      })
  },
}
</script>
