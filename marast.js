// ===================================================================
// Configuración de categorías (colores compartidos entre nodos/edges/leyenda)
// ===================================================================
const categorias = {
    infra:    { color: '#e9c46a', hover: '#ffe066', nombre: 'Infrastructure' },
    frontend: { color: '#00b4d8', hover: '#00f5ff', nombre: 'Frontend' },
    backend:  { color: '#95190c', hover: '#ff3333', nombre: 'Backend' },
    tools:    { color: '#8d99ae', hover: '#edf2f4', nombre: 'Language / Tools' }
};

// ===================================================================
// 1. Definimos las tecnologías (nodos del grafo)
// ===================================================================
const techData = [
    // Backend
    { id: 'nestjs',   nombre: 'NestJS',      sub: 'Backend',            categoria: 'backend',  descripcion: 'Framework de Node.js para construir APIs escalables y modulares.' },
    { id: 'postgres', nombre: 'PostgreSQL',  sub: 'Base de datos',      categoria: 'backend',  descripcion: 'Base de datos relacional robusta y de código abierto.' },
    { id: 'sql',      nombre: 'SQL',         sub: 'Lenguaje de consultas', categoria: 'backend', descripcion: 'Lenguaje estándar para consultar y manipular bases de datos relacionales.' },
    { id: 'nodejs',   nombre: 'Node.js',     sub: 'Runtime',            categoria: 'backend',  descripcion: 'Entorno de ejecución de JavaScript del lado del servidor.' },
    { id: 'java',     nombre: 'Java',        sub: 'Lenguaje',           categoria: 'backend',  descripcion: 'Lenguaje orientado a objetos usado en backend y sistemas empresariales.' },
    { id: 'cpp',      nombre: 'C++',         sub: 'Lenguaje',           categoria: 'backend',  descripcion: 'Lenguaje de bajo nivel para software de alto rendimiento.' },
    { id: 'python',   nombre: 'Python',      sub: 'Lenguaje',           categoria: 'backend',  descripcion: 'Lenguaje versátil usado en backend, scripting y automatización.' },
    { id: 'firebase', nombre: 'Firebase',    sub: 'BaaS',               categoria: 'backend',  descripcion: 'Plataforma de Google para autenticación, backend y bases de datos en tiempo real.' },

    // Frontend
    { id: 'angular',    nombre: 'Angular',     sub: 'Frontend',   categoria: 'frontend', descripcion: 'Framework de Google para construir interfaces web escalables.' },
    { id: 'ts',         nombre: 'TypeScript',  sub: 'Lenguaje',   categoria: 'frontend', descripcion: 'Superset de JavaScript con tipado estático.' },
    { id: 'javascript', nombre: 'JavaScript',  sub: 'Lenguaje',   categoria: 'frontend', descripcion: 'Lenguaje base del desarrollo web moderno.' },
    { id: 'html',       nombre: 'HTML',        sub: 'Markup',     categoria: 'frontend', descripcion: 'Lenguaje de marcado para estructurar contenido web.' },
    { id: 'css',        nombre: 'CSS',         sub: 'Estilos',    categoria: 'frontend', descripcion: 'Lenguaje de estilos para diseñar interfaces web.' },

    // Infraestructura
    { id: 'docker', nombre: 'Docker', sub: 'Container',          categoria: 'infra', descripcion: 'Contenerización de aplicaciones para despliegues consistentes.' },
    { id: 'k8s',    nombre: 'K8s',    sub: 'Orquestación',       categoria: 'infra', descripcion: 'Orquestador de contenedores para despliegues a escala.' },
    { id: 'azure',  nombre: 'Azure',  sub: 'Cloud',              categoria: 'infra', descripcion: 'Plataforma cloud de Microsoft para infraestructura y servicios.' },
    { id: 'linux',  nombre: 'Linux',  sub: 'Sistema operativo',  categoria: 'infra', descripcion: 'Sistema operativo base de servidores e infraestructura.' },

    // Herramientas / lenguajes de control
    { id: 'git',     nombre: 'Git',     sub: 'Control de vers.', categoria: 'tools', descripcion: 'Sistema de control de versiones distribuido.' },
    { id: 'github',  nombre: 'GitHub',  sub: 'Repositorio',      categoria: 'tools', descripcion: 'Plataforma de alojamiento de repositorios Git.' },
    { id: 'gitlab',  nombre: 'GitLab',  sub: 'Repositorio',      categoria: 'tools', descripcion: 'Plataforma de alojamiento Git con CI/CD integrado.' },
    { id: 'jasmine', nombre: 'Jasmine', sub: 'Testing',          categoria: 'tools', descripcion: 'Framework de testing para JavaScript.' },
    { id: 'karma',   nombre: 'Karma',   sub: 'Test runner',      categoria: 'tools', descripcion: 'Ejecutor de pruebas para proyectos Angular.' }
];

// 2. Convertimos las tecnologías en nodos de vis-network
const nodos = new vis.DataSet(techData.map(t => {
    const cat = categorias[t.categoria];
    return {
        id: t.id,
        label: `${t.nombre}\n${t.sub}`,
        opacity: 1,
        color: {
            border: cat.color,
            background: '#21263a',
            hover: { border: cat.hover, background: '#21263a' }
        },
        font: { color: cat.color }
    };
}));

// ===================================================================
// 3. Definimos las conexiones (edges)
// 'dashes: true' indica relación asíncrona / indirecta
// ===================================================================
const conexionesData = [
    { from: 'nestjs', to: 'postgres', dashes: true },
    { from: 'nestjs', to: 'angular', dashes: true },
    { from: 'nestjs', to: 'ts' },
    { from: 'nestjs', to: 'nodejs' },
    { from: 'angular', to: 'ts' },
    { from: 'angular', to: 'html', dashes: true },
    { from: 'angular', to: 'css', dashes: true },
    { from: 'angular', to: 'jasmine' },
    { from: 'jasmine', to: 'karma' },
    { from: 'ts', to: 'javascript' },
    { from: 'nodejs', to: 'javascript' },
    { from: 'postgres', to: 'sql' },
    { from: 'postgres', to: 'firebase', dashes: true },
    { from: 'docker', to: 'nestjs' },
    { from: 'docker', to: 'k8s' },
    { from: 'docker', to: 'azure', dashes: true },
    { from: 'docker', to: 'linux' },
    { from: 'k8s', to: 'azure' },
    { from: 'git', to: 'nestjs', dashes: true },
    { from: 'git', to: 'github' },
    { from: 'git', to: 'gitlab' },
    { from: 'git', to: 'java', dashes: true },
    { from: 'git', to: 'cpp', dashes: true },
    { from: 'git', to: 'python', dashes: true }
];

const techById = Object.fromEntries(techData.map(t => [t.id, t]));

const conexiones = new vis.DataSet(conexionesData.map(e => {
    const cat = categorias[techById[e.from].categoria];
    return {
        id: `${e.from}-${e.to}`,
        from: e.from,
        to: e.to,
        dashes: !!e.dashes,
        color: { color: cat.color, hover: cat.hover, opacity: 1 }
    };
}));

// ===================================================================
// 4. Configuración del diseño y la física
// ===================================================================
const opciones = {
    nodes: {
        shape: 'circle',
        borderWidth: 2,
        size: 52,
        font: {
            size: 18,
            face: 'JetBrains Mono',
            multi: false
        }
    },
    edges: {
        width: 1.5,
        hoverWidth: 2.5,
        selectionWidth: 0,
        smooth: {
            type: 'continuous'
        }
    },
    interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: false,
        zoomView: false,
    },
    physics: {
        barnesHut: {
            gravitationalConstant: -6500,
            centralGravity: 0.3,
            springLength: 220
        },
        minVelocity: 0.75
    }
};

// 5. Inicializamos la red en el contenedor HTML
const contenedor = document.getElementById('stack-network');
const datos = { nodes: nodos, edges: conexiones };
const red = new vis.Network(contenedor, datos, opciones);

// ===================================================================
// Zoom: escala base, botones estéticos y zoom suave al hover/click de un nodo
// ===================================================================
const ZOOM_ANIM = { duration: 450, easingFunction: 'easeInOutQuad' };
const ZOOM_ANIM_RAPIDO = { duration: 250, easingFunction: 'easeInOutQuad' };
const FACTOR_ZOOM_BOTON = 1.3; // incremento por click en +/-

let escalaBase = 1;
let nodoActivo = null;

red.once('stabilizationIterationsDone', function () {
    red.fit({ animation: false });
    escalaBase = red.getScale();
    // Congelamos la física una vez estabilizado para que la disposición
    // de los nodos no siga moviéndose de fondo.
    red.setOptions({ physics: false });
});

function zoomReset() {
    red.fit({ animation: ZOOM_ANIM });
}

document.getElementById('zoom-in').addEventListener('click', function () {
    const nuevaEscala = Math.min(red.getScale() * FACTOR_ZOOM_BOTON, escalaBase * 4);
    red.moveTo({ scale: nuevaEscala, animation: ZOOM_ANIM_RAPIDO });
});

document.getElementById('zoom-out').addEventListener('click', function () {
    const nuevaEscala = Math.max(red.getScale() / FACTOR_ZOOM_BOTON, escalaBase * 0.5);
    red.moveTo({ scale: nuevaEscala, animation: ZOOM_ANIM_RAPIDO });
});

document.getElementById('zoom-reset').addEventListener('click', function () {
    nodoActivo = null;
    zoomReset();
});

// ===================================================================
// 6. Panel lateral: mostrar detalle del nodo + dimming de no relacionados
// ===================================================================
const panelInfo = document.getElementById('panel-info');

const placeholderHTML = `
    <div class="panel-placeholder-wrap">
        <p class="panel-placeholder">Selecciona un nodo<br>para ver detalles</p>
    </div>
`;

function resetVista() {
    nodos.update(nodos.getIds().map(id => ({ id, opacity: 1 })));
    conexiones.update(conexiones.getIds().map(id => {
        const e = conexiones.get(id);
        return { id, color: { color: e.color.color, hover: e.color.hover, opacity: 1 } };
    }));
    panelInfo.style.borderTopColor = '#5c6784';
    panelInfo.innerHTML = placeholderHTML;
}

function activarNodo(nodeId) {
    nodoActivo = nodeId;

    const conectadosIds = red.getConnectedNodes(nodeId);
    const edgesConectados = red.getConnectedEdges(nodeId);
    const relevantes = new Set([nodeId, ...conectadosIds]);

    nodos.update(nodos.getIds().map(id => ({
        id,
        opacity: relevantes.has(id) ? 1 : 0.15
    })));

    conexiones.update(conexiones.getIds().map(id => {
        const e = conexiones.get(id);
        const conectado = edgesConectados.includes(id);
        return { id, color: { color: e.color.color, hover: e.color.hover, opacity: conectado ? 1 : 0.08 } };
    }));

    const tech = techById[nodeId];
    const cat = categorias[tech.categoria];
    const conectados = conectadosIds.map(id => techById[id]);

    panelInfo.style.borderTopColor = cat.color;
    panelInfo.innerHTML = `
        <p class="panel-categoria" style="color:${cat.color}">${cat.nombre.toUpperCase()}</p>
        <h3 class="panel-nombre">${tech.nombre}</h3>
        <p class="panel-sub">${tech.sub}</p>
        <p class="panel-descripcion">${tech.descripcion}</p>
        <p class="panel-conectado-titulo">CONNECTED TO</p>
        <div class="badges">
            ${conectados.map(c => {
                const cCat = categorias[c.categoria];
                return `<span class="badge-conn" style="border-color:${cCat.color}; color:${cCat.color}">${c.nombre}</span>`;
            }).join('') || '<span class="panel-descripcion" style="margin:0;">Sin conexiones directas</span>'}
        </div>
    `;
}

function desactivarNodo() {
    nodoActivo = null;
    resetVista();
}

red.on('hoverNode', function (params) {
    activarNodo(params.node);
});

red.on('blurNode', function () {
    desactivarNodo();
});

// Soporte táctil / click: acercar al tocar un nodo, alejar al tocar fuera
red.on('click', function (params) {
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        if (nodoActivo !== nodeId) {
            activarNodo(nodeId);
        }
    } else if (nodoActivo !== null) {
        desactivarNodo();
    }
});

// Estado inicial
resetVista();