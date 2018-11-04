
import {UnflattenCatsAndBrief, LayersToGeojsonArray} from "./utils";


let unflattenInput,unflattenOutput,layersToGeojsonArrayInput,layersToGeoJsonArrayOutput;

beforeAll(() => {
  unflattenInput={"categories":[{"id":1,"parentId":0,"name":"Bölgeler","icon":"clone","__typename":"Category"},{"id":2,"parentId":0,"name":"Binalar","icon":"clone","__typename":"Category"},{"id":3,"parentId":2,"name":"Üniversiteler","icon":"clone","__typename":"Category"},{"id":4,"parentId":2,"name":"Camiler","icon":"clone","__typename":"Category"},{"id":5,"parentId":4,"name":"İstanbldaki camiler","icon":"clone","__typename":"Category"},{"id":6,"parentId":5,"name":"Beşiktaştaki camiler","icon":"clone","__typename":"Category"}],"layerBrief":[{"id":2,"name":"Üniversiteler","type":"polygon","icon":"map-o","categoryId":2,"brief":[{"col":"name","type":"text","title":"İsim","validation":"","__typename":"LayerBrief"},{"col":"time","type":"text","title":"Tarih","validation":"","__typename":"LayerBrief"},{"col":"set","type":"text","title":"Milli","validation":"","__typename":"LayerBrief"}],"__typename":"Layer"},{"id":1,"name":"Ülkeler","type":"marker","icon":"map-o","categoryId":1,"brief":[{"col":"name","type":"text","title":"İsim","validation":"","__typename":"LayerBrief"},{"col":"note","type":"text","title":"Not","validation":"","__typename":"LayerBrief"},{"col":"region","type":"text","title":"Bölge","validation":"","__typename":"LayerBrief"},{"col":"wikipedia","type":"text","title":"Wikipedia","validation":"","__typename":"LayerBrief"},{"col":"region_big","type":"text","title":"Büyük Bölge","validation":"","__typename":"LayerBrief"}],"__typename":"Layer"},{"id":3,"name":"Güzellikler","type":"point","icon":"map-o","categoryId":1,"brief":[{"col":"name","type":"text","title":"İsim","validation":"","__typename":"LayerBrief"},{"col":"region","type":"text","title":"Bölge","validation":"","__typename":"LayerBrief"},{"col":"scalerank","type":"text","title":"Seviye","validation":"","__typename":"LayerBrief"},{"col":"subregion","type":"text","title":"Alt Bölge","validation":"","__typename":"LayerBrief"},{"col":"featureclass","type":"text","title":"Sınıf","validation":"","__typename":"LayerBrief"}],"__typename":"Layer"},{"id":4,"name":"Küçük adalar","type":"Polygon","icon":"map-o","categoryId":1,"brief":[{"col":"name","type":"text","title":"İsim","validation":"","__typename":"LayerBrief"},{"col":"region","type":"text","title":"Bölge","validation":"","__typename":"LayerBrief"},{"col":"scalerank","type":"text","title":"Seviye","validation":"","__typename":"LayerBrief"},{"col":"subregion","type":"text","title":"Alt Bölge","validation":"","__typename":"LayerBrief"},{"col":"featureclass","type":"text","title":"Sınıf","validation":"","__typename":"LayerBrief"}],"__typename":"Layer"}],"__typename":"CatsAndBrief"};

  unflattenOutput=[{"key":"1","title":"Bölgeler","parentId":0,"type":"cat","children":[{"key":"1_1","title":"Ülkeler","parentId":1,"type":"layer"},{"key":"3_1","title":"Güzellikler","parentId":1,"type":"layer"},{"key":"4_1","title":"Küçük adalar","parentId":1,"type":"layer"}]},{"key":"2","title":"Binalar","parentId":0,"type":"cat","children":[{"key":"3","title":"Üniversiteler","parentId":2,"type":"cat"},{"key":"4","title":"Camiler","parentId":2,"type":"cat","children":[{"key":"5","title":"İstanbldaki camiler","parentId":4,"type":"cat","children":[{"key":"6","title":"Beşiktaştaki camiler","parentId":5,"type":"cat"}]}]},{"key":"2_2","title":"Üniversiteler","parentId":2,"type":"layer"}]}];

  layersToGeojsonArrayInput={"getLayersById":[{"id":2,"clientId":1,"categoryId":2,"name":"Üniversiteler","type":"polygon","features":[{"id":2,"layerId":2,"geometry":{"type":"Point","coordinates":[-102.5791,22.7608]},"properties":{"_id":2,"name":"University of Southampton","time":"2013-04-30","_layerid":2},"type":"Feature","__typename":"Feature"},{"id":1,"layerId":2,"geometry":{"type":"Point","coordinates":[-1.56273,52.380531]},"properties":{"_id":20,"name":"Laboratorio de Software Libre","time":"2013-04-05","_layerid":9},"type":"Feature","__typename":"Feature"}],"brief":[{"col":"name","type":"text","title":"İsim","validation":"","__typename":"LayerBrief"},{"col":"time","type":"text","title":"Tarih","validation":"","__typename":"LayerBrief"},{"col":"set","type":"text","title":"Milli","validation":"","__typename":"LayerBrief"}],"__typename":"Layer"}]};
  layersToGeoJsonArrayOutput=[{"type":"FeatureCollection","features":[{"id":2,"layerId":2,"geometry":{"type":"Point","coordinates":[-102.5791,22.7608]},"properties":{"_id":2,"name":"University of Southampton","time":"2013-04-30","_layerid":2},"type":"Feature","__typename":"Feature"},{"id":1,"layerId":2,"geometry":{"type":"Point","coordinates":[-1.56273,52.380531]},"properties":{"_id":20,"name":"Laboratorio de Software Libre","time":"2013-04-05","_layerid":9},"type":"Feature","__typename":"Feature"}],"__typename":"Geojson","_id":"1","key":"f730d740-7cb8-11e8-aff7-d96689941abe"}];
});


describe('UnflattenCatsAndBrief Function',()=>{

  it('Should unflatten input data for Tree',()=>{
    
    expect(UnflattenCatsAndBrief(unflattenInput)).toEqual(unflattenOutput);
  });

  
});
describe('LayersToGeojsonArray Function',()=>{

  it('Should convert Layer to GeoJSON array',()=>{
    
    expect(LayersToGeojsonArray(layersToGeojsonArrayInput)).toEqual(layersToGeoJsonArrayOutput);
  });

  
});
