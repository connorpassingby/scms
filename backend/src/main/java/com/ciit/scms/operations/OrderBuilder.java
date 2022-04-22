package com.ciit.scms.operations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Set;

import com.ciit.scms.models.Order;
import com.ciit.scms.models.OrderItem;
import com.ciit.scms.models.Product;

public class OrderBuilder {
	private Order order;
	private HashMap<String, Object> data;
	
	public OrderBuilder(Order order) {
		this.order=order;
		this.data = new HashMap<String, Object>();
		
		this.execute();
	}

	public void execute() {
		data.put("customer", order.getCustomer().getLastName());
		data.put("isOrderFulfilled", order.getIsOrderFulfilled());
	
		Set<OrderItem> orderItems = order.getOrderItems();
	
		ArrayList<HashMap<String, Object>> orderItemData = new ArrayList<HashMap<String,Object>>();
		
		for (OrderItem o: orderItems) {
			HashMap<String,Object> orderItemHashMap = new HashMap<String,Object>();
			orderItemHashMap.put("product", o.getProduct().getName());
			orderItemHashMap.put("quantity", o.getQuantity());
			orderItemHashMap.put("price", o.getPrice());
			
			orderItemData.add(orderItemHashMap);
		}
		
		data.put("products", orderItemData);
		
	}
	
	public HashMap<String, Object> getData() {
		return data;
	}
}
