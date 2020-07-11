module.exports = {
    loadingPara
};
async function loadingPara(){
	return {
      color: '#FFFFFF',
      size: 20,
      overlayColor: 'rgba(0,0,0,0.5)',
      closeOnTouch: false,
      loadingType: 'Bars', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
      }
}