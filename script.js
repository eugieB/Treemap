let kickStarterUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

let kickStarter

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {

    let hierarchy = d3.hierarchy(kickStarter, (node) => {
        return node['children']
    } 
).sum((node) => {
    return node['value']
}
).sort((node1, node2) => {
    return node2['value'] - node1['value']
    })
    let createTreeMap = d3.treemap().size([1500, 800])
    createTreeMap(hierarchy)

    let kickTiles = hierarchy.leaves()
    console.log(kickTiles)

    let block = canvas.selectAll('g')
    .data(kickTiles)
    .enter()
    .append('g')
    .attr('transform', (kick) => {
        return 'translate (' + kick['x0'] + ', ' + kick['y0'] + ')'
        
    })

    block.append('rect')
    .attr('class', 'tile')
    
    .attr('fill', (kick) => {
        let category = kick['data']['category']
        if(category === 'Product Design') {
            return '#eb4034'
        }else if(category === 'Tabletop Games'){
            return '#eb6434'
        }else if(category === 'Gaming Hardware'){
            return '#eb8934'
        }else if(category === 'Video Games'){
            return '#ebb134'
        }else if(category === 'Sound'){
            return '#c6eb34'
        }else  if(category === 'Television'){
            return '#34eb89'
        }else if(category === 'Narrative Film') {
            return '#34b4eb'
        }else if(category === 'Web') {
            return '#9b34eb'
        }else if(category === 'Hardware') {
            return '#34e8eb'
        }else if(category === 'Games') {
            return '#eb34e5'
        }
    })
    .attr('data-name', (kick) => {
        return kick['data']['name']
    })
    .attr('data-category', (kick) => {
        return kick['data']['category']
    })
    .attr('data-value', (kick) => {
        return kick['data']['value']
    })
    .attr('width', (kick) => {
        return kick['x1'] - kick['x0']
    })
    .attr('height', (kick) => {
        return kick['y1'] - kick['y0']
    })
    .on('mouseover', (kick) => {
        tooltip.transition()
                .style('visibility', 'visible')

        let revenue = kick['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        tooltip.html(
            '$ ' + revenue + '<hr />' + kick['data']['name']
        )
        tooltip.attr('data-value', kick['data']['value'])

    })
    .on('mouseout', (kick) => {
        tooltip.transition()
              .style('visibility', 'hidden')
    })
    
block.append('text')
.text((kick) => {
    return kick['data']['name']
})
.attr('x', 5)
.attr('y', 20)
}



d3.json(kickStarterUrl).then((data, error) => {
    if(error){
        console.log(error)
    } else {
        kickStarter = data
        console.log(kickStarter)
        drawTreeMap()
    }
  }
)
