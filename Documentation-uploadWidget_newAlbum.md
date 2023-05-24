# Upload Widget Documentation

All image upload actions can only be done in the navbar actions. Image upload can be triggered in two ways. 
1. During the 'Create new album' process.
2. Clicking on 'add images' icon on existing Album.

## 1. Image Upload from Create New Album 

Flow below is started immediately after creating a new album. i.e. is the last part of create new album process.

Signature options are prepared in advance and then wait for user to click 'Add Images To Album xyz' to open the widget. No delay experienced when opening widget. Signature pre-loading is possible because we already know the album name at this point.

``` mermaid
flowchart TD;
    subgraph sg1 [pre-load signature]
        id1(1.Add Images Button DIV) -->
        id2{2.is visible?}
        id2-->id3(3.get foldername dataset)
        id3-.-id4(4.dataDIV dataset attribute)
        id3--->id5[/5.set signature options/]
        id5-->id6>6.options object ready]
        id6-.->id7([7. wait for click])
    end

    id2-.......-id8{8. is clicked?}

    subgraph sg2 [launch widget]
        id9>9. options object]-->id10[/10. process results/]
        id10-->id11{11. upload success?}
    end

    id11-->id12[/12. redirect to view album page/]
    id11-->id13[/13. reload page/]

    id8---> sg2
    
```

## 2. Image Upload for Existing Album 

In flow below there is a noticeable delay before the widget opens. This is because the signature options are not prepared in advance. Currently cannot pre-load signature because the folder name must be known in advance. In this flow, we only know the album name when user clicks on it.

``` mermaid
flowchart TD;
    subgraph sg1 [pre-load signature]
        id1(1.Add Images Icon) -->
        id2{2.is clicked?}
        id2-->id3(3.get foldername dataset)
        id3-.-id4(4.dataDIV dataset attribute)
        id3--->id5[/5.set signature options/]
        id5-->id6>6.options object ready]
    end

    subgraph sg2 [launch widget]
        id9>9. options object]-->id10[/10. process results/]
        id10-->id11{11. upload success?}
    end

    id11-->id12[/12. redirect to view album page/]
    id11-->id13[/13. reload page/]

    id6---> sg2
    
```