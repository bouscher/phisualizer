$(document).ready(function(jQuery){
var SEPARATION = 100, AMOUNTX = 100, AMOUNTY = 50;

        var container, stats;
        var camera, scene, renderer;

        var particles, particle, count = 0;

        var mouseX = 0, mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        
        var ctx = new (window.AudioContext || webkitAudioContext)();

  var audio = document.getElementById('moosik');
  var analyser = ctx.createAnalyser();
  var audioSrc = ctx.createMediaElementSource(audio);
   audioSrc.connect(analyser);
  // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
 analyser.connect(ctx.destination);
 analyser.fftSize = 128;
  // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

        init();
        audio.play();
        animate();

        function init() {

                container = document.createElement( 'div' );
                document.body.appendChild( container );

                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 1000;

                scene = new THREE.Scene();

                particles = new Array();

                var PI2 = Math.PI * 2;
                var material=new Array();
                material.push( new THREE.SpriteCanvasMaterial( {

                        color: 0xff0000,
                        program: function ( context ) {
context.globalAlpha = 0.5;
					var x = 0, y = 0;
					context.scale(0.1, -0.1); // Scale so canvas render can redraw within bounds
					context.beginPath();
					 // From http://blog.burlock.org/html5/130-paths
					context.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
					context.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0,y + 3.5 );
					context.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
					context.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
					context.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
					context.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
					context.closePath();
					context.fill();
					context.lineWidth = 0.5; //0.05
					context.stroke();

                        }

                } ));
                material.push( new THREE.SpriteCanvasMaterial( {

                        color: 0x5449EE,
                        program: function ( context ) {
context.globalAlpha = 0.5;
					var x = 0, y = 0;
					context.scale(0.1, -0.1); // Scale so canvas render can redraw within bounds
					context.beginPath();
					 // From http://blog.burlock.org/html5/130-paths
					context.bezierCurveTo( x + 2.5, y + 2.5, x + 2.0, y, x, y );
					context.bezierCurveTo( x - 3.0, y, x - 3.0, y + 3.5,x - 3.0,y + 3.5 );
					context.bezierCurveTo( x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5 );
					context.bezierCurveTo( x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5 );
					context.bezierCurveTo( x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y );
					context.bezierCurveTo( x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5 );
					context.closePath();
					context.fill();
					context.lineWidth = 0.05; //0.05
					context.stroke();

                        }

                } ));

                var i = 0;

                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
var stuff=1;
if(iy%2==0){
    stuff=0;
}
                                particle = particles[ i ++ ] = new THREE.Sprite( material[stuff] );
                                particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                                particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                                scene.add( particle );

                        }

                }

                renderer = new THREE.CanvasRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );



                document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                //

                window.addEventListener( 'resize', onWindowResize, false );

        }

        function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

        }

        function onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                        event.preventDefault();

                        mouseX = event.touches[ 0 ].pageX - windowHalfX;
                        mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

        }

        function onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                        event.preventDefault();

                        mouseX = event.touches[ 0 ].pageX - windowHalfX;
                        mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

        }

        //

        function animate() {

                requestAnimationFrame( animate );

                render();


        }

        function render() {
analyser.getByteFrequencyData(frequencyData);
                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY - camera.position.y ) * .05;
                camera.lookAt( scene.position );

                var i = 0;

                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                        for ( var iy = 0; iy < AMOUNTY; iy ++ ) {
                               
                                particle = particles[ i++ ];
                                var varierY=0;
                                var varierX=0;
                                if(i%10==0){
                        
                                    varierX=frequencyData[10];
                                }else if(i%5==0){
                                    varierX=frequencyData[5];
                                }else if(i%20==0){
                                    varierX=frequencyData[50]/2;
                                }
                                //console.log(frequencyData[20]);
                                particle.position.y = ( Math.sin( ( ix + (count-(frequencyData[20]/1000) )) * 0.3   ) * frequencyData[1]*2 ) +
                                        ( Math.sin( ( iy + count ) * 0.5 ) *50 )+varierX;
                                particle.scale.x = particle.scale.y = (( Math.sin( ( iy + count ) * 0.3 ) + 1 ) * 4 +
                                        ( Math.sin( ( iy + count ) * 0.5 )  ) * (frequencyData[4]/2));

                        }

                }

                renderer.render( scene, camera );

                count += 0.1;

        }
});