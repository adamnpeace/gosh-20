if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
			}
			var camera, scene, renderer, stats;
			init();
			animate();
			function init() {
				var container = document.getElementById( 'container' );
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 2000 );
				camera.position.set( - 1, 2, 4 );
				scene = new THREE.Scene();
				//
				var loader = new THREE.PlayCanvasLoader();
				loader.load( './models/playcanvas/hand.json', function ( model ) {
					scene.add( model );
				} );
				//
				var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
				scene.add( ambientLight );
				var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				camera.add( pointLight );
				scene.add( camera );
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				//
				var controls = new THREE.OrbitControls( camera );
				//
				stats = new Stats();
				container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}
			function render() {
				renderer.render( scene, camera );
			}
